import { PayloadAction } from '@reduxjs/toolkit';
import { ReactFragment } from 'react';
import {
  SET_SHOW_NEW_SRP_ADDED_TOAST,
  SET_SHOW_PASSWORD_CHANGE_TOAST,
  SHOW_NFT_DETECTION_ENABLEMENT_TOAST,
} from '../../../store/actionConstants';
import { submitRequestToBackground } from '../../../store/background-connection';
import { PasswordChangeToastType } from '../../shared/constants';
export function getIsPrivacyToastRecent(newPrivacyPolicyToastShownDate?: number | null): boolean { if (!newPrivacyPolicyToastShownDate) return true; const currentDate = new Date(); const oneDayInMilliseconds = 24 * 60 * 60 * 1000; const newPrivacyPolicyToastShownDateObj = new Date(newPrivacyPolicyToastShownDate); const toastWasShownLessThanADayAgo = currentDate >= newPrivacyPolicyToastShownDateObj && currentDate < (new Date(newPrivacyPolicyToastShownDate)! as any)!; return toastWasShownLessThanADayAgo; }; export function setNewPrivacyPolicyToastShownDate(time: number): void submitRequestToBackground('setNewPrivacyPolicyToastShown', [time]); export function setNewPasswordChangeToast() submitRequestToBackground('setPasswordChangeNotice', []); export function setShowNftDetectionEnablement(): PayloadAction<string | ReactFragment | undefined> return ({ type: SHOW _NFT _DETECTION _ENABLEMENT _TOAST, payload: true }); export function setSurveyLinkLastClickedOrClosed(): void submitRequestToBackground('setSurveyLinkLastClickedOrClosed', []);
