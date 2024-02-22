interface ISettings {
  amPHIHostName: string;
  smtpServer: string;
  useMail: boolean;
}

class Settings implements ISettings {
  constructor(
    public amPHIHostName: string,
    public smtpServer: string,
    public useMail: boolean
  ) {}
}

export default Settings;