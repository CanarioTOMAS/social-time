import { useRef, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import BusinessIcon from "@mui/icons-material/Business";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import AvatarEditor from "react-avatar-editor";

interface IProfileFormProps {
  onChange: (data: any) => void;
}
interface formValue {
  defaultImage: string;
}

interface AvatarType {
  user: "user";
  business: "business";
  product: "product";
  box: "box";
  client: "client";
}

function ProfileForm({
  onChange,
  avatarType,
  defaultImage,
}: IProfileFormProps & {
  avatarType: AvatarType[keyof AvatarType];
} & formValue) {
  const [avatarSrc, setAvatarSrc] = useState<File | null>(null);
  const [image, setImage] = useState("");
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [editor, setEditor] = useState<AvatarEditor | null>(null);
  const [open, setOpen] = useState(false);
  const [scale, setScale] = useState(1);

  const handleClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setAvatarSrc(file);
      onChange(file);
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setOpen(true);
    }
  };

  const handleButtonClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    if (editor) {
      const canvas = editor.getImage();

      canvas.toBlob((blob) => {
        console.log(blob);

        if (blob) {
          let reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onload = () => {
            //aqui ya esta en base64
            let base64 = reader.result;
            onChange(base64);
          };
          setAvatarSrc(new File([blob], "avatar.png"));
          setOpen(false);
        }
      }, "image/png");
    }
  };

  const avatarIcons: Record<AvatarType[keyof AvatarType], JSX.Element> = {
    user: <PersonIcon sx={{ color: "white" }} />,
    business: <BusinessIcon sx={{ color: "white" }} />,
    product: <LocalMallIcon sx={{ color: "white" }} />,
    box: <CheckBoxIcon sx={{ color: "white" }} />,
    client: <AssignmentIndIcon sx={{ color: "white" }} />,
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          onClick={handleButtonClick}
          src={image || defaultImage}
          alt="Profile"
          style={{ cursor: "pointer" }}
          sx={{
            m: 1,
            width: 64,
            height: 64,
            "&:hover $editButton, &:focus-within $editButton": {
              opacity: 1,
            },
          }}
          {...(avatarSrc ? { key: avatarSrc.name } : {})}
        >
          {avatarType && avatarIcons[avatarType]}
        </Avatar>
        <input
          type="file"
          accept="image/*"
          onChange={handleClick}
          style={{
            display: "none",
            opacity: 0,
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
            cursor: "pointer",
            ...(!avatarSrc && { display: "none" }),
          }}
          ref={inputFileRef}
        />
        <Dialog
          open={open}
          onClose={handleClose}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <DialogContent>
            {avatarSrc && (
              <AvatarEditor
                ref={(ref) => setEditor(ref)}
                image={avatarSrc}
                width={200}
                height={200}
                border={50}
                borderRadius={100}
                color={[255, 255, 255, 0.6]}
                scale={scale}
                rotate={0}
              />
            )}
          </DialogContent>
          <DialogActions
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box sx={{ mr: 1 }}>
                <ZoomInIcon
                  onClick={() => setScale(scale + 0.1)}
                  sx={{ color: "#757575", "&:hover": { color: "#9e9e9e" } }}
                />
              </Box>
              <Box sx={{ mr: 0.2 }}>
                <ZoomOutIcon
                  onClick={() => setScale(scale - 0.1)}
                  sx={{ color: "#757575", "&:hover": { color: "#9e9e9e" } }}
                />
              </Box>
            </Box>
          </DialogActions>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button onClick={handleSave}>Guardar</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}

export default ProfileForm;
