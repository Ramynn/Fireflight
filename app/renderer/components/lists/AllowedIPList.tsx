import React, {useEffect, useMemo, useState} from 'react';
import {FunctionComponent} from 'react';
import {Table, message, Space} from 'antd';
import {ColumnsType} from 'antd/es/table';
import {Tooltip} from 'antd';
import {Typography} from 'antd';
import styled from 'styled-components';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import {useTranslation} from 'react-i18next';
import {useAllowedIPListState, useAppHashState} from '../../hooks';
import {useAllowedIPListIPC} from '../../hooks';

interface AllowedIPListProps {}

export const AllowedIPList: FunctionComponent<AllowedIPListProps> = () => {
  const {t} = useTranslation();
  const [, , removeAllowedIP] = useAllowedIPListIPC();
  const [appHashState] = useAppHashState();
  const [allowedIPListState] = useAllowedIPListState();
  const [normalizedIPList, setNormalizedIPList] = useState<{IP: string; index: number}[]>();
  const columns = useMemo<ColumnsType<{IP: string; index: number}>>(() => {
    return [
      {
        dataIndex: 'index',
        key: 'index',
        render: (value) => {
          return <IndexHolder>#{value + 1}</IndexHolder>;
        }
      },
      {
        dataIndex: 'IP',
        key: 'IP',
        render: (value) => {
          return (
            <IPContentHolder>
              <IPAddressHolder copyable={true}>{value}</IPAddressHolder>
            </IPContentHolder>
          );
        }
      },
      {
        render: (value, record) => {
          return (
            <ActionHolder>
              <Tooltip placement="topRight" title={t('StoredIPs.List.Actions.RemoveItem')}>
                <DeleteButton onClick={() => removeIPFromAllowList(record.IP)} />
              </Tooltip>
            </ActionHolder>
          );
        }
      }
    ];
  }, []);

  useEffect(() => {
    setNormalizedIPList(
      allowedIPListState.map((IP, index) => ({
        IP,
        index
      }))
    );
  }, [allowedIPListState, appHashState]);

  // async function addIPToAllowList(IP: string) {
  //   await IPCHelper.allowedIPList.add([IP]);
  //   updateHashState();
  //   message.destroy();
  //   message.success(t('Lists.Messages.ItemAdded'));
  // }

  async function removeIPFromAllowList(IP: string) {
    await removeAllowedIP([IP]);
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

const IndexHolder = styled.div`
  margin: 0 -3px 0 -6px;
  font-size: 14px;
  font-weight: 500;
  opacity: 0.8;
  width: 28px;
`;

const IPContentHolder = styled.div`
  font-size: 14px;
`;
const IPAddressHolder = styled(Typography.Text)`
  font-weight: 600;
`;
const ActionHolder = styled(Space)`
  font-size: 13px;
  opacity: 0.8;
`;
const DeleteButton = styled(CloseOutlined)`
  cursor: pointer;
`;
