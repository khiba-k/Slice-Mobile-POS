declare module '@react-native-picker/picker' {
    import * as React from 'react';
    import { ViewProps } from 'react-native';

    export interface PickerProps extends ViewProps {
        selectedValue?: any;
        onValueChange?: (itemValue: any, itemIndex: number) => void;
        enabled?: boolean;
        mode?: 'dialog' | 'dropdown';
        prompt?: string;
        testID?: string;
        dropdownIconColor?: string;
        dropdownIconRippleColor?: string;
        style?: any;
        itemStyle?: any;
    }

    export class Picker extends React.Component<PickerProps> {
        static Item: React.ComponentType<{
            label: string;
            value: any;
            color?: string;
        }>;
    }
}
