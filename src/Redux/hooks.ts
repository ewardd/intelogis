import { useSelector, type TypedUseSelectorHook, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../types/redux';

export const useAppDispatch = useDispatch<AppDispatch>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
