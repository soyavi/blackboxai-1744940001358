import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import EventForm from './EventForm';
import {useSelector, useDispatch} from 'react-redux';
import {Calendar} from 'react-native-calendars';
import moment from 'moment';
import Feather from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useTranslation} from 'react-i18next';
import css from '../../Styles';

const AgendaScreen = () => {
  const styles = css();
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const calendar = useSelector(state => state.calendar);
  const [isAddEventModalVisible, setAddEventModalVisible] = useState(false);

  // Add some initial events for testing
  useEffect(() => {
    if (calendar.events.length === 0) {
      const today = moment().format('YYYY-MM-DD');
      const tomorrow = moment().add(1, 'day').format('YYYY-MM-DD');
      
      dispatch({
        type: 'ADD_EVENT',
        event: {
          id: '1',
          title: 'Test Event 1',
          description: 'This is a test event for today',
          date: today,
          startTime: new Date(new Date().setHours(10, 0, 0, 0)),
          endTime: new Date(new Date().setHours(11, 0, 0, 0)),
        },
      });
      
      dispatch({
        type: 'ADD_EVENT',
        event: {
          id: '2',
          title: 'Test Event 2',
          description: 'This is a test event for tomorrow',
          date: tomorrow,
          startTime: new Date(new Date().setHours(14, 0, 0, 0)),
          endTime: new Date(new Date().setHours(15, 0, 0, 0)),
        },
      });
    }
  }, []);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: moment().format('YYYY-MM-DD'),
    startTime: new Date(),
    endTime: new Date(),
  });

  // Handle view changes (month, week, day)
  const handleViewChange = (view) => {
    dispatch({
      type: 'SET_CURRENT_VIEW',
      view,
    });
  };

  // Handle date selection
  const handleDateSelect = (date) => {
    dispatch({
      type: 'SET_SELECTED_DATE',
      date: date.dateString,
    });
  };

  // Add new event
  const handleAddEvent = () => {
    const event = {
      ...newEvent,
      id: Date.now().toString(),
    };
    dispatch({
      type: 'ADD_EVENT',
      event,
    });
    setAddEventModalVisible(false);
    setNewEvent({
      title: '',
      description: '',
      date: moment().format('YYYY-MM-DD'),
      startTime: new Date(),
      endTime: new Date(),
    });
  };

  // Format events for calendar marking
  const getMarkedDates = () => {
    const marked = {};
    calendar.events.forEach(event => {
      marked[event.date] = {
        marked: true,
        dotColor: styles.textPrimaryColor,
      };
    });
    return marked;
  };

  return (
    <View style={[styles.container, styles.bgMain]}>
      {/* Header */}
      <View style={[styles.dFlex, styles.justifyContentBetween, styles.p4, styles.borderBottomLight]}>
        <Text style={[styles.textNormal, styles.fwBold, styles.fs4]}>{t('Agenda')}</Text>
        <TouchableOpacity onPress={() => setAddEventModalVisible(true)}>
          <Feather name="plus" size={24} color={styles.textPrimaryColor} />
        </TouchableOpacity>
      </View>

      {/* View Selector */}
      <View style={[styles.dFlex, styles.justifyContentCenter, styles.p2, styles.gap3]}>
        {['month', 'week', 'day'].map((view) => (
          <TouchableOpacity
            key={view}
            onPress={() => handleViewChange(view)}
            style={[
              styles.btn,
              calendar.currentView === view ? styles.btnPrimary : styles.btnLight,
            ]}>
            <Text
              style={[
                styles.textNormal,
                calendar.currentView === view ? styles.textWhite : styles.textNormal,
              ]}>
              {t(view.charAt(0).toUpperCase() + view.slice(1))}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Calendar */}
      <Calendar
        current={calendar.selectedDate}
        onDayPress={handleDateSelect}
        markedDates={getMarkedDates()}
        theme={{
          backgroundColor: styles.bgMainColor,
          calendarBackground: styles.bgMainColor,
          textSectionTitleColor: styles.textNormalColor,
          selectedDayBackgroundColor: styles.bgPrimaryColor,
          selectedDayTextColor: '#ffffff',
          todayTextColor: styles.textPrimaryColor,
          dayTextColor: styles.textNormalColor,
          textDisabledColor: styles.textSecondaryColor,
          dotColor: styles.textPrimaryColor,
          monthTextColor: styles.textNormalColor,
          arrowColor: styles.textPrimaryColor,
        }}
      />

      {/* Events List */}
      <ScrollView style={[styles.flexGrow1, styles.p4]}>
        {calendar.events
          .filter(event => event.date === calendar.selectedDate)
          .map(event => (
            <View
              key={event.id}
              style={[
                styles.p3,
                styles.mb3,
                styles.borderLight,
                styles.rounded,
                styles.bgLight,
              ]}>
              <Text style={[styles.textNormal, styles.fwBold]}>{event.title}</Text>
              <Text style={[styles.textSecondary]}>{event.description}</Text>
              <Text style={[styles.textSecondary]}>
                {moment(event.startTime).format('HH:mm')} -{' '}
                {moment(event.endTime).format('HH:mm')}
              </Text>
            </View>
          ))}
      </ScrollView>

      {/* Add Event Modal */}
      <Modal
        isVisible={isAddEventModalVisible}
        onBackdropPress={() => setAddEventModalVisible(false)}
        style={[styles.m0, styles.justifyContentCenter]}>
        <View style={[styles.bgMain, styles.rounded, styles.mh4, {maxHeight: '80%'}]}>
          <View style={[styles.p4, styles.borderBottomLight]}>
            <Text style={[styles.textNormal, styles.fwBold, styles.fs4]}>
              {t('Add New Event')}
            </Text>
          </View>
          <EventForm
            event={newEvent}
            onSave={(eventData) => {
              dispatch({
                type: 'ADD_EVENT',
                event: eventData,
              });
              setAddEventModalVisible(false);
            }}
            onCancel={() => setAddEventModalVisible(false)}
          />
        </View>
      </Modal>
    </View>
  );
};

export default AgendaScreen;
