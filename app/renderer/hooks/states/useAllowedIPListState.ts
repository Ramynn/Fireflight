import {atom, useRecoilState} from 'recoil';
import {useMemo} from 'react';
import CIDRMatcher from 'cidr-matcher';
import {CIDRMatcherInterface} from '../../types';

type AllowedIPListState = [string[], (value: string[]) => void, CIDRMatcherInterface];

const recoilState = atom<string[]>({
  key: 'AllowedIPListState',
  default: []
});

export function useAllowedIPListState(): AllowedIPListState {
  const [state, setState] = useRecoilState(recoilState);
  const CIDR = useMemo(() => new CIDRMatcher(state), [JSON.stringify(state)]);

  function setNormalizedState(value: string[]) {
    const normalizedList = value.map((allowedIP) => (allowedIP.includes('/') ? allowedIP : `${allowedIP}/32`));

    setState(normalizedList);
  }

  return [state, setNormalizedState, CIDR];
}
