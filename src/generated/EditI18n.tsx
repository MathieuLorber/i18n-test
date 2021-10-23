import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import * as React from "react";
import { PropsWithChildren, useContext, useEffect, useState } from "react";
import { LanguageContext } from "../Updater";

export const EditI18n = (
  props: PropsWithChildren<{
    file: string;
    messageKey: string;
    messages: { fr: string; en: string };
  }>
) => {
  const { language } = useContext(LanguageContext);
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const [message, setMessage] = useState("");
  const [newMessage, setNewMessage] = useState(message);
  useEffect(() => {
    let initialMessage = "----";
    if (language === "fr") {
      initialMessage = props.messages.fr;
    } else if (language === "en") {
      initialMessage = props.messages.en;
    }
    setMessage(initialMessage);
    setNewMessage(initialMessage);
  }, [language, props.messages]);
  return (
    <>
      <span
        onClick={() => {
          if (!open) {
            setOpen(true);
          }
        }}
      >
        {message}
      </span>
      <Dialog
        open={open}
        onClose={close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>
          Update i18n {props.file}:{props.messageKey}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <textarea defaultValue={"Actual string in english"} />
            <br />
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setMessage(newMessage);
              close();
            }}
            autoFocus
          >
            save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
