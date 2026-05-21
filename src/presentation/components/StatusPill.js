import React from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import {LEVELS} from '../../constants/thresholds';

const StatusPill = ({label, color, message, level, triggers}) => {
  const isNormal = level === LEVELS.NORMAL;
  const isCritical = level === LEVELS.CRITICAL;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isNormal ? '#2ecc7110' : isCritical ? color : color + '25',
          borderColor: color,
          borderWidth: isNormal ? 1 : 2,
        },
      ]}>
      <View style={styles.header}>
        <Text style={[styles.label, {color: isCritical ? '#fff' : color}]}>
          {isCritical ? '⚠️ ' + label : label}
        </Text>
        {isCritical && (
          <View style={styles.alertBadge}>
            <Text style={styles.alertBadgeText}>ALERTA MÁXIMA</Text>
          </View>
        )}
      </View>

      {message ? (
        <Text style={[styles.message, {color: isCritical ? '#fff' : '#9fb6ce'}]}>
          {message}
        </Text>
      ) : null}

      {!isNormal && triggers && triggers.length > 0 && (
        <View style={[styles.triggerContainer, { borderTopColor: isCritical ? 'rgba(255,255,255,0.2)' : color + '40' }]}>
          <Text style={[styles.triggerTitle, { color: isCritical ? '#fff' : color }]}>SENSORES AFECTADOS:</Text>
          <View style={styles.pillRow}>
            {triggers.map((t, i) => (
              <View key={i} style={[styles.miniPill, { backgroundColor: isCritical ? 'rgba(255,255,255,0.3)' : color + '20' }]}>
                <Text style={[styles.miniPillText, { color: isCritical ? '#fff' : color }]}>{t}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 18,
    marginVertical: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  label: {
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  message: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
  alertBadge: {
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  alertBadgeText: {
    color: '#e74c3c',
    fontSize: 10,
    fontWeight: '900',
  },
  triggerContainer: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
  },
  triggerTitle: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 6,
    opacity: 0.9,
  },
  pillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  miniPill: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  miniPillText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },
});

export default StatusPill;
