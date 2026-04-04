import { EnvironmentProviders, importProvidersFrom } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {
  DashboardOutline,
  TransactionOutline,
  DollarCircleFill,
  WalletOutline,
  RiseOutline,
  FallOutline,
  SaveOutline,
  FireFill,
  CalendarOutline,
  DollarOutline,
  PlusOutline,
  EditOutline,
  DeleteOutline,
  DownloadOutline,
  SearchOutline,
  ClearOutline,
  ArrowUpOutline,
  ArrowDownOutline,
  MenuFoldOutline,
  MenuUnfoldOutline,
  SunOutline,
  MoonOutline,
  UserOutline,
  EyeOutline
} from '@ant-design/icons-angular/icons';

const icons = [
  DashboardOutline,
  TransactionOutline,
  DollarCircleFill,
  WalletOutline,
  RiseOutline,
  FallOutline,
  SaveOutline,
  FireFill,
  CalendarOutline,
  DollarOutline,
  PlusOutline,
  EditOutline,
  DeleteOutline,
  DownloadOutline,
  SearchOutline,
  ClearOutline,
  ArrowUpOutline,
  ArrowDownOutline,
  MenuFoldOutline,
  MenuUnfoldOutline,
  SunOutline,
  MoonOutline,
  UserOutline,
  EyeOutline
];

export function provideNzIcons(): EnvironmentProviders {
  return importProvidersFrom(NzIconModule.forRoot(icons));
}
