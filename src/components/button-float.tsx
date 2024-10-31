import { Link } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

export const ButtonFloat = ({
  title,
  iconBefore,
  iconAfter,
  url,
}: {
  title: string;
  iconBefore?: JSX.Element;
  iconAfter?: JSX.Element;
  url: any;
}) => {
  return (
    <Link href={url} asChild>
      <TouchableOpacity
        className="flex-row gap-1 justify-center items-center bg-slate-300 rounded-xl h-10 min-w-16 px-2"
        style={{
          // Shadow for iOS
          shadowColor: "#262626",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          // Shadow for Android
          elevation: 4,
        }}
      >
        {iconBefore}
        <Text className="text-zinc-500">{title}</Text>
        {iconAfter}
      </TouchableOpacity>
    </Link>
  );
};
