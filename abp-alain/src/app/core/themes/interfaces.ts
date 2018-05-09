import { Layout } from '@delon/theme';

export type ThemeType = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J';


export interface MyLayout extends Layout {
    /** 当前主题 */
    theme: ThemeType;
}
