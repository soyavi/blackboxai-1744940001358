import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useTranslation} from 'react-i18next';
import moment from 'moment';
import css from '../../Styles';

const EventForm = ({event, onSave, onCancel}) => {
  const styles = css();
  const {t} = useTranslation();
  
  const [formData, setFormData] = useState({
    title: event?.title || '',
    description: event?.description || '',
    date: event?.date || moment().format('YYYY-MM-DD'),
    startTime: event?.startTime || new Date(),
    endTime: event?.endTime || new Date(Date.now() + 3600000), // Default 1 hour duration
  });

  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = t('Title is required');
    }
    if (!formData.description.trim()) {
      newErrors.description = t('Description is required');
    }
    if (moment(formData.endTime).isBefore(formData.startTime)) {
      newErrors.time = t('End time must be after start time');
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave({
        ...formData,
        id: event?.id || Date.now().toString(),
      });
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setFormData(prev => ({
        ...prev,
        date: moment(selectedDate).format('YYYY-MM-DD'),
      }));
    }
  };

  const handleStartTimeChange = (event, selectedTime) => {
    setShowStartTimePicker(false);
    if (selectedTime) {
      setFormData(prev => ({
        ...prev,
        startTime: selectedTime,
      }));
    }
  };

  const handleEndTimeChange = (event, selectedTime) => {
    setShowEndTimePicker(false);
    if (selectedTime) {
      setFormData(prev => ({
        ...prev,
        endTime: selectedTime,
      }));
    }
  };

  return (
    <ScrollView style={[styles.flexGrow1]}>
      <View style={[styles.p4]}>
        {/* Title Input */}
        <View style={[styles.mb4]}>
          <Text style={[styles.textNormal, styles.mb2]}>{t('Title')}</Text>
          <TextInput
            style={[
              styles.input,
              errors.title ? styles.inputError : null,
            ]}
            value={formData.title}
            onChangeText={(text) => setFormData(prev => ({...prev, title: text}))}
            placeholder={t('Enter event title')}
            placeholderTextColor={styles.textSecondaryColor}
          />
          {errors.title && (
            <Text style={[styles.textDanger, styles.mt1]}>{errors.title}</Text>
          )}
        </View>

        {/* Description Input */}
        <View style={[styles.mb4]}>
          <Text style={[styles.textNormal, styles.mb2]}>{t('Description')}</Text>
          <TextInput
            style={[
              styles.input,
              styles.textAreaInput,
              errors.description ? styles.inputError : null,
            ]}
            value={formData.description}
            onChangeText={(text) => setFormData(prev => ({...prev, description: text}))}
            placeholder={t('Enter event description')}
            placeholderTextColor={styles.textSecondaryColor}
            multiline
            numberOfLines={4}
          />
          {errors.description && (
            <Text style={[styles.textDanger, styles.mt1]}>{errors.description}</Text>
          )}
        </View>

        {/* Date Picker */}
        <View style={[styles.mb4]}>
          <Text style={[styles.textNormal, styles.mb2]}>{t('Date')}</Text>
          <TouchableOpacity
            style={[styles.input]}
            onPress={() => setShowDatePicker(true)}>
            <Text style={[styles.textNormal]}>
              {moment(formData.date).format('MMMM D, YYYY')}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Time Pickers */}
        <View style={[styles.mb4]}>
          <Text style={[styles.textNormal, styles.mb2]}>{t('Time')}</Text>
          <View style={[styles.dFlex, styles.flexRow, styles.gap3]}>
            <TouchableOpacity
              style={[styles.input, styles.flex1]}
              onPress={() => setShowStartTimePicker(true)}>
              <Text style={[styles.textNormal]}>
                {moment(formData.startTime).format('HH:mm')}
              </Text>
            </TouchableOpacity>
            <Text style={[styles.textNormal]}>-</Text>
            <TouchableOpacity
              style={[styles.input, styles.flex1]}
              onPress={() => setShowEndTimePicker(true)}>
              <Text style={[styles.textNormal]}>
                {moment(formData.endTime).format('HH:mm')}
              </Text>
            </TouchableOpacity>
          </View>
          {errors.time && (
            <Text style={[styles.textDanger, styles.mt1]}>{errors.time}</Text>
          )}
        </View>

        {/* Action Buttons */}
        <View style={[styles.dFlex, styles.flexRow, styles.gap3, styles.mt4]}>
          <TouchableOpacity
            style={[styles.btnLight, styles.flex1]}
            onPress={onCancel}>
            <Text style={[styles.textNormal]}>{t('Cancel')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btnPrimary, styles.flex1]}
            onPress={handleSave}>
            <Text style={[styles.textWhite]}>{t('Save')}</Text>
          </TouchableOpacity>
        </View>

        {/* Date/Time Pickers (Native) */}
        {showDatePicker && (
          <DateTimePicker
            value={new Date(formData.date)}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleDateChange}
          />
        )}
        {showStartTimePicker && (
          <DateTimePicker
            value={new Date(formData.startTime)}
            mode="time"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleStartTimeChange}
          />
        )}
        {showEndTimePicker && (
          <DateTimePicker
            value={new Date(formData.endTime)}
            mode="time"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleEndTimeChange}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default EventForm;
