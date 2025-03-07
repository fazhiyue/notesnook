/*
This file is part of the Notesnook project (https://notesnook.com/)

Copyright (C) 2022 Streetwriters (Private) Limited

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

import { Dimensions } from "react-native";
import Config from "react-native-config";
import { FileType } from "react-native-scoped-storage";
import create, { State } from "zustand";
import { ACCENT } from "../utils/color-scheme";

export type Settings = {
  showToolbarOnTop?: boolean;
  showKeyboardOnOpen?: boolean;
  fontScale?: number;
  forcePortraitOnTablet?: boolean;
  useSystemTheme?: boolean;
  reminder?: string;
  encryptedBackup?: boolean;
  homepage?: string;
  sort?: string;
  sortOrder?: string;
  screenshotMode?: boolean;
  privacyScreen?: boolean;
  appLockMode?: string;
  telemetry?: boolean;
  notebooksListMode?: "normal" | "compact";
  notesListMode?: "normal" | "compact";
  devMode?: boolean;
  notifNotes?: boolean;
  pitchBlack?: boolean;
  reduceAnimations?: boolean;
  rateApp?: boolean | number;
  migrated?: boolean;
  introCompleted?: boolean;
  nextBackupRequestTime?: number | undefined;
  lastBackupDate?: number | undefined;
  userEmailConfirmed?: boolean;
  recoveryKeySaved?: boolean;
  theme: {
    accent: string;
    dark: boolean;
  };
  backupDirectoryAndroid?: FileType | null;
  showBackupCompleteSheet: boolean;
  lastRecoveryEmailTime?: number;
  lastVerificationEmailTime?: number;
  sessionExpired: boolean;
  version: string | null;
  doubleSpacedLines?: boolean;
};

type DimensionsType = {
  width: number;
  height: number;
};

export interface SettingStore extends State {
  settings: Settings;
  fullscreen: boolean;
  deviceMode: string | null;
  dimensions: DimensionsType;
  setSettings: (settings: Settings) => void;
  setFullscreen: (fullscreen: boolean) => void;
  setDeviceMode: (mode: string) => void;
  setDimensions: (dimensions: DimensionsType) => void;
  appLoading: boolean;
  setAppLoading: (appLoading: boolean) => void;
  setSheetKeyboardHandler: (sheetKeyboardHandler: boolean) => void;
  sheetKeyboardHandler: boolean;
  requestBiometrics: boolean;
  setRequestBiometrics: (requestBiometrics: boolean) => void;
}

const { width, height } = Dimensions.get("window");

export const useSettingStore = create<SettingStore>((set) => ({
  settings: {
    showToolbarOnTop: false,
    showKeyboardOnOpen: false,
    fontScale: 1,
    forcePortraitOnTablet: false,
    useSystemTheme: false,
    reminder: "off",
    encryptedBackup: false,
    homepage: "Notes",
    sort: "default",
    sortOrder: "desc",
    screenshotMode: true,
    privacyScreen: false,
    appLockMode: "none",
    telemetry: true,
    notebooksListMode: "normal",
    notesListMode: "normal",
    devMode: false,
    notifNotes: false,
    pitchBlack: false,
    reduceAnimations: false,
    rateApp: false,
    migrated: false,
    introCompleted: Config.isTesting ? true : false,
    nextBackupRequestTime: undefined,
    lastBackupDate: undefined,
    userEmailConfirmed: false,
    recoveryKeySaved: false,
    theme: {
      accent: ACCENT?.color,
      dark: false
    },
    showBackupCompleteSheet: true,
    sessionExpired: false,
    version: null,
    doubleSpacedLines: true
  },
  sheetKeyboardHandler: true,
  fullscreen: false,
  deviceMode: "mobile",
  dimensions: { width, height },
  appLoading: true,
  setSettings: (settings) => set({ settings }),
  setFullscreen: (fullscreen) => set({ fullscreen }),
  setDeviceMode: (mode) => set({ deviceMode: mode }),
  setDimensions: (dimensions) => set({ dimensions: dimensions }),
  setAppLoading: (appLoading) => set({ appLoading }),
  setSheetKeyboardHandler: (sheetKeyboardHandler) =>
    set({ sheetKeyboardHandler }),
  requestBiometrics: false,
  setRequestBiometrics: (requestBiometrics) => set({ requestBiometrics })
}));
