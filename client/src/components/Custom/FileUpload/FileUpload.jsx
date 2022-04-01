import { Widget } from "@uploadcare/react-widget";
import { useDispatch } from "react-redux";
import { setMessage } from "../../../redux/settings/settingsActions";

const FileUpload = ({ ...other }) => {
  const dispatch = useDispatch();
  const errors = {
    errors: {
      filesize: "Вес изображения слишком большой",
      type: "Неверный тип файла",
    },
    dialog: {
      tabs: {
        preview: {
          error: {
            filesize: {
              text: "Вес изображения слишком большой",
            },
            type: {
              text: "Неверный тип файла",
            },
          },
        },
      },
    },
  };

  const fileTypeLimit = (allowedFileTypes) => {
    const types = allowedFileTypes.split(" ");

    return function (fileInfo) {
      if (fileInfo.name === null) {
        return;
      }
      const extension = fileInfo.name.split(".").pop();

      if (extension && !types.includes(extension)) {
        dispatch(setMessage("FORBIDDEN_TYPE"));
        throw new Error("type");
      }
    };
  };

  const fileSizeLimit = (maxSize) => {
    return function (fileInfo) {
      if (fileInfo.name === null) {
        return;
      }

      if (fileInfo.size && fileInfo.size > maxSize) {
        dispatch(setMessage("LIMIT_FILE_SIZE"));
        throw new Error("filesize");
      }
    };
  };

  return (
    <>
      <Widget
        publicKey="73fb322ae944f810ceb2"
        locale="ru"
        validators={[fileTypeLimit("jpeg png jpg"), fileSizeLimit(1000000)]}
        tabs="file url"
        localeTranslations={errors}
        {...other}
      />
    </>
  );
};

export default FileUpload;
