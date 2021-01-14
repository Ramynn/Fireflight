import React, {useEffect, useMemo, useState} from 'react';
import {FunctionComponent} from 'react';
import {Table, message, Space} from 'antd';
import {ColumnsType} from 'antd/es/table';
import {IPInfoInterface} from '../../types';
import ReactCountryFlag from 'react-country-flag';
import {Tooltip} from 'antd';
import {Typography} from 'antd';
import styled from 'styled-components';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import SafetyCertificateOutlined from '@ant-design/icons/SafetyCertificateOutlined';
import SafetyCertificateFilled from '@ant-design/icons/SafetyCertificateFilled';
import {useTranslation} from 'react-i18next';
import {useAllowedIPListState, useAppHashState, useStoredIPListState, useAllowedIPListIPC, useStoredIPListIPC, useInternationalization} from '../../hooks';

interface StoredIPListProps {}

export const StoredIPList: FunctionComponent<StoredIPListProps> = () => {
  const {t} = useTranslation();
  const [appHashState] = useAppHashState();
  const [allowedIPListState, , allowedIPListCIDR] = useAllowedIPListState();
  const [storedIPListState] = useStoredIPListState();
  const [, addAllowedIP, removeAllowedIP] = useAllowedIPListIPC();
  const [, , removeStoredIP] = useStoredIPListIPC();
  const [normalizedIPList, setNormalizedIPList] = useState<(IPInfoInterface & {isAllowed: boolean; index: number})[]>();
  const [internationalization] = useInternationalization();
  const columns = useMemo<ColumnsType<IPInfoInterface & {isAllowed: boolean; index: number}>>(() => {
    return [
      {
        dataIndex: 'countryCode',
        key: 'countryCode',
        render: (value) => {
          return (
            <IPFlagHolder>
              <ReactCountryFlag countryCode={value} svg={true} />
            </IPFlagHolder>
          );
        }
      },
      {
        key: 'safety',
        render: (value, record) => {
          return (
            <ActionHolder>
              {record.isAllowed ? (
                <SafeButton onClick={() => removeIPFromAllowList(record)} />
              ) : (
                <Tooltip placement="topRight" title={t('StoredIPs.List.Actions.AllowItem')}>
                  <AllowIPButton onClick={() => addIPToAllowList(record)} />
                </Tooltip>
              )}
            </ActionHolder>
          );
        }
      },
      {
        dataIndex: 'IP',
        key: 'IP',
        render: (value, record) => {
          return (
            <IPContentHolder>
              <IPAddressHolder copyable={true}>{value}</IPAddressHolder>
              <IPLocationHolder>
                {record.country}, {record.city}
              </IPLocationHolder>
            </IPContentHolder>
          );
        }
      },
      {
        dataIndex: 'date',
        key: 'date',
        render: (value) => {
          const date = new Date(value);

          return (
            <Tooltip title={date.toString()}>
              <DateHolder>{internationalization.format(date)}</DateHolder>
            </Tooltip>
          );
        }
      },
      {
        render: (value, record) => {
          return (
            <ActionHolder>
              <Tooltip placement="topRight" title={t('StoredIPs.List.Actions.RemoveItem')}>
                <DeleteButton onClick={() => deleteIPFromHistory(record)} />
              </Tooltip>
            </ActionHolder>
          );
        }
      }
    ];
  }, []);

  useEffect(() => {
    setNormalizedIPList(
      storedIPListState.map((storedIPItem, index) => ({
        ...storedIPItem,
        isAllowed: allowedIPListCIDR.contains(storedIPItem.IP),
        index
      }))
    );
  }, [allowedIPListCIDR, allowedIPListState, storedIPListState, appHashState]);

  async function addIPToAllowList(value: IPInfoInterface) {
    await addAllowedIP([value.IP]);
    message.destroy();
    message.success(t('Lists.Messages.ItemAdded'));
  }

  async function removeIPFromAllowList(value: IPInfoInterface) {
    await removeAllowedIP([value.IP]);
    message.destroy();
    message.success(t('Lists.Messages.ItemDeleted'));
  }

  async function deleteIPFromHistory(value: IPInfoInterface) {
    await removeStoredIP([value]);
    message.destroy();
    message.success(t('Lists.Messages.ItemDeleted'));
  }

  return (
    <Table
      size="small"
      showHeader={false}
      rowKey="ID"
      dataSource={normalizedIPList}
      columns={columns}
      pagination={{
        hideOnSinglePage: true,
        pageSize: 100
      }}
    />
  );
};

const IPFlagHolder = styled.div`
  font-size: 32px;
  display: flex;
`;
const IPContentHolder = styled.div`
  font-size: 14px;
`;
const IPAddressHolder = styled(Typography.Text)`
  font-weight: 600;

  .ant-typography-copy {
    transition: opacity 0.2s ease;
    opacity: 0;
  }

  &:hover .ant-typography-copy {
    opacity: 1;
  }
`;
const IPLocationHolder = styled.div`
  font-size: 12px;
  opacity: 0.7;
`;
const DateHolder = styled.div`
  font-size: 12px;
  opacity: 0.8;
`;

const ActionHolder = styled(Space)`
  font-size: 14px;

  > * {
    cursor: pointer;
  }
`;

const DeleteButton = styled(CloseOutlined)``;

const SafeButton = styled(SafetyCertificateFilled)``;

const AllowIPButton = styled(SafetyCertificateOutlined)``;
