import { View } from "react-native";
import { ButtonFloat } from "./button-float";
import {
  ChevronDown,
  FileInput,
  FileOutputIcon,
  NotepadTextDashedIcon,
  Plus,
} from "lucide-react-native";

export const DocumentoButtonGroup = ({ pathname }: { pathname: string }) => {
  return (
    <View className="flex-row gap-3 p-4">
      {pathname !== "/(documents)/new" && (
        <ButtonFloat
          title="Novo"
          url={"/(documents)/new"}
          iconBefore={<Plus size={14} color={"#817f7f"} />}
          iconAfter={<ChevronDown size={14} color={"#817f7f"} />}
        />
      )}
      {pathname !== "/entry" && (
        <ButtonFloat
          title="Entrada"
          url={"/(documents)/entry"}
          iconBefore={<FileInput size={14} color={"#817f7f"} />}
        />
      )}
      {pathname !== "/output" && (
        <ButtonFloat
          title="Saída"
          url={"/(documents)/output"}
          iconBefore={<FileOutputIcon size={14} color={"#817f7f"} />}
        />
      )}
      {pathname !== "/my-drafts" && (
        <ButtonFloat
          title="Meus rascunhos"
          url={"/(documents)/my-drafts"}
          iconBefore={<NotepadTextDashedIcon size={14} color={"#817f7f"} />}
        />
      )}
      {pathname !== "/personal-archive" && (
        <ButtonFloat
          title="Arquivo pessoal"
          url={"/(documents)/personal-archive"}
          iconBefore={<NotepadTextDashedIcon size={14} color={"#817f7f"} />}
        />
      )}
      {pathname !== "/section-files" && (
        <ButtonFloat
          title="Arquivo da seção"
          url={"/(documents)/section-files"}
          iconBefore={<NotepadTextDashedIcon size={14} color={"#817f7f"} />}
        />
      )}
    </View>
  );
};
