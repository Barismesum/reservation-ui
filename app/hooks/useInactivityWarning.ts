"use client"
import { useEffect, useRef, useState, useCallback } from 'react';

export function useInactivityWarning(timeout: number = 30000) {
  const [showWarning, setShowWarning] = useState(false);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
  const resetTimerRef = useRef<NodeJS.Timeout | null>(null);

  const resetPage = useCallback(() => {
    localStorage.clear();
    window.location.reload();
  }, []);

  const clearAllTimers = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
  }, []);

  const startInactivityTimer = useCallback(() => {
    if (!isMonitoring) return;
    
    clearAllTimers();
    
    inactivityTimerRef.current = setTimeout(() => {
      setShowWarning(true);
      resetTimerRef.current = setTimeout(resetPage, 10000);
    }, timeout);
  }, [timeout, clearAllTimers, resetPage, isMonitoring]);

  const handleContinue = useCallback(() => {
    setShowWarning(false);
    clearAllTimers();
    startInactivityTimer();
  }, [clearAllTimers, startInactivityTimer]);

  const startMonitoring = useCallback(() => {
    setIsMonitoring(true);
    startInactivityTimer();
  }, [startInactivityTimer]);

  useEffect(() => {
    const events = ['mousedown', 'keydown', 'touchstart', 'mousemove'];
    const handleUserActivity = () => {
      if (!showWarning && isMonitoring) {
        startInactivityTimer();
      }
    };

    events.forEach(event => {
      document.addEventListener(event, handleUserActivity);
    });

    return () => {
      clearAllTimers();
      events.forEach(event => {
        document.removeEventListener(event, handleUserActivity);
      });
    };
  }, [startInactivityTimer, showWarning, clearAllTimers, isMonitoring]);

  useEffect(() => {
    if (showWarning) {
      resetTimerRef.current = setTimeout(resetPage, 10000);
      return () => {
        if (resetTimerRef.current) {
          clearTimeout(resetTimerRef.current);
        }
      };
    }
  }, [showWarning, resetPage]);

  return { showWarning, handleContinue, startMonitoring };
}