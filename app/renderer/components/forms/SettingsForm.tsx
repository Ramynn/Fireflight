import React, {useEffect} from 'react';
import {FunctionComponent} from 'react';
import {Form, Select, Switch, message} from 'antd';
import {AppSettingsInterface} from '../../types';
import {debugHelper} from '../../helpers';
import {useTranslation} from 'react-i18next';
import {useAnalytics, useAppSettingsIPC, useAppSettingsState} from '../../hooks';

interface SettingsFormProps {}

export const SettingsForm: FunctionComponent<SettingsFormProps> = () => {
  const {sendEvent} = useAnalytics();
  const [form] = Form.useForm();
  const [appSettingsState] = useAppSettingsState();
  const [, updateAppSettingsIPC] = useAppSettingsIPC();
  const {t} = useTranslation();

  useEffect(() => {
    form.setFieldsValue(appSettingsState);
  }, [appSettingsState]);

  async function updateAppSettings(values: AppSettingsInterface) {
    try {
      message.destroy();
      await updateAppSettingsIPC(values);
      message.success(t('Settings.Form.Messages.Saved'));
    } catch (error) {
      debugHelper.error('SettingsForm', 'Update App Settings', error);
    }
  }

  function onValuesChange(changedValues: Partial<AppSettingsInterface>, values: AppSettingsInterface) {
    sendEvent('SettingFormUpdate', changedValues);
    updateAppSettings(values);
  }

  return (
    <Form layout="vertical" form={form} name="settings" onValuesChange={onValuesChange} initialValues={appSettingsState} scrollToFirstError={true}>
      <Form.Item name="isEnabled" fieldKey="isEnabled" label={t('Settings.Form.Fields.isEnabled.Title')} extra={t('Settings.Form.Fields.isEnabled.Extra')} valuePropName="checked">
        <Switch />
      </Form.Item>
      <Form.Item
        name="openOnSystemStart"
        fieldKey="openOnSystemStart"
        label={t('Settings.Form.Fields.openOnSystemStart.Title')}
        extra={t('Settings.Form.Fields.openOnSystemStart.Extra')}
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>
      <Form.Item
        name="runInMenubar"
        fieldKey="runInMenubar"
        label={t('Settings.Form.Fields.runInMenubar.Title')}
        extra={t('Settings.Form.Fields.runInMenubar.Extra')}
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>
      <Form.Item
        name="allowPrivateIPs"
        fieldKey="allowPrivateIPs"
        label={t('Settings.Form.Fields.allowPrivateIPs.Title')}
        extra={t('Settings.Form.Fields.allowPrivateIPs.Extra')}
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>
      <Form.Item
        name="newIPNotification"
        fieldKey="newIPNotification"
        label={t('Settings.Form.Fields.newIPNotification.Title')}
        extra={t('Settings.Form.Fields.newIPNotification.Extra')}
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>
      <Form.Item
        name="enableAnalytics"
        fieldKey="enableAnalytics"
        label={t('Settings.Form.Fields.enableAnalytics.Title')}
        extra={t('Settings.Form.Fields.enableAnalytics.Extra')}
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>
      <Form.Item
        name="storedItemsCount"
        fieldKey="storedItemsCount"
        label={t('Settings.Form.Fields.storedItemsCount.Title')}
        extra={t('Settings.Form.Fields.storedItemsCount.Extra')}
      >
        <Select>
          {[50, 100, 200, 500, 1000].map((value) => {
            return (
              <Select.Option key={value.toString()} value={value}>
                {t('General.Items', {count: value})}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item name="interval" fieldKey="interval" label={t('Settings.Form.Fields.interval.Title')} extra={t('Settings.Form.Fields.interval.Extra')}>
        <Select>
          {[5000, 10000, 15000, 20000, 60000].map((value) => {
            return (
              <Select.Option key={value.toString()} value={value}>
                {t('General.SecondLoop', {count: value / 1000})}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>
    </Form>
  );
};
