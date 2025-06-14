import {useThemeStore} from '@/src/store/useThemeStore';
import {useAppTheme} from '@/src/theme';
import {
  Button,
  ButtonText,
  EyeIcon,
  EyeOffIcon,
  FormControl,
  Icon,
  Input,
  InputField,
  Spinner,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import {useState} from 'react';
import {Controller} from 'react-hook-form';
import {Pressable} from 'react-native';
import {LoginFormProps} from './form.interface';

const LoginForm = ({control, errors, onSubmit, isLoading}: LoginFormProps) => {
  const {theme} = useAppTheme();
  const {isDark} = useThemeStore();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <VStack gap={16}>
      <FormControl isInvalid={!!errors.email}>
        <Controller
          name="email"
          control={control}
          rules={{required: true, pattern: /^\S+@\S+$/i}}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              borderWidth={1}
              borderColor={theme.colors.borderInput}
              height={48}
              backgroundColor={theme.colors.inputs}
              borderRadius={8}
              paddingLeft={12}>
              <InputField
                placeholder="E-mail"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                autoCapitalize="none"
                keyboardType="email-address"
                autoComplete="email"
                autoCorrect
                fontSize={15}
                color={theme.colors.text}
                textAlignVertical="center"
                paddingTop={12}
                placeholderTextColor={theme.colors.placeholder}
              />
            </Input>
          )}
        />
        {errors.email && (
          <Text color={theme.colors.error} fontSize={13} marginTop={2}>
            Email inválido
          </Text>
        )}
      </FormControl>

      <FormControl isInvalid={!!errors.password}>
        <Controller
          name="password"
          control={control}
          rules={{required: true, minLength: 6}}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              borderWidth={1}
              borderColor={theme.colors.borderInput}
              height={48}
              backgroundColor={theme.colors.inputs}
              borderRadius={8}
              paddingLeft={12}
              flexDirection="row"
              alignItems="center">
              <InputField
                placeholder="Senha"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoComplete="password"
                autoCorrect
                fontSize={15}
                color={theme.colors.text}
                flex={1}
                textAlignVertical="center"
                placeholderTextColor={theme.colors.placeholder}
              />
              <Pressable
                onPress={() => setShowPassword(v => !v)}
                style={{padding: 8}}>
                <Icon
                  as={showPassword ? EyeIcon : EyeOffIcon}
                  width={22}
                  height={22}
                  color={isDark ? theme.colors.white : theme.colors.gray}
                />
              </Pressable>
            </Input>
          )}
        />
        {errors.password && (
          <Text color={theme.colors.error} fontSize={13} marginTop={2}>
            Senha inválida
          </Text>
        )}
      </FormControl>

      <Button
        onPress={onSubmit}
        backgroundColor={theme.colors.primary}
        height={48}
        borderRadius={22}
        marginBottom={16}
        justifyContent="center"
        isDisabled={isLoading}>
        {isLoading ? (
          <Spinner color="#fff" />
        ) : (
          <ButtonText
            color={theme.colors.text}
            fontSize={16}
            fontWeight="bold"
            textAlign="center">
            Login
          </ButtonText>
        )}
      </Button>
    </VStack>
  );
};

export default LoginForm;
