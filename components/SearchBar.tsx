import { Feather } from '@expo/vector-icons';
import useThemeColor from 'hooks/useThemeColor';
import { TextInput, View, Pressable } from 'react-native';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

const SearchBar = ({ value, onChangeText }: SearchBarProps) => {
  const theme = useThemeColor();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.border,
        borderRadius: 10,
        padding: 10,
      }}>
      <TextInput
        style={{
          flex: 1,
          paddingVertical: 5,
          color: theme.secondaryText,
        }}
        placeholder="Search movies..."
        placeholderTextColor={theme.secondaryText}
        value={value}
        onChangeText={onChangeText}
        returnKeyType="search"
      />
      {value && (
        <Pressable onPress={() => onChangeText('')}>
          <Feather name="x" size={20} color={theme.secondaryText} />
        </Pressable>
      )}
    </View>
  );
};

export default SearchBar;
