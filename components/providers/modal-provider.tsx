"use client";

import { useEffect, useState } from "react";
import { CreateServerModal } from "../modals/create-server-modal";
import { InviteModal } from "../modals/invite-modal";
import EditServerModal from "../modals/edit-server-modal";
import { MembersModal } from "../modals/member-modals";
import { CreateChannelModal } from "../modals/create-channel-modal";
import { DeleteServerModal } from "../modals/delete-server-modal";
import { LeaveServerModal } from "../modals/leave-server-modal";
import { EditChannelModal } from "../modals/edit-channel-modal";
import { DeleteChannelModal } from "../modals/delete-channel-modal";
import { MessageFileModal } from "../modals/message-file-modal";
import { DeleteMessageModal } from "../modals/delete-message-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <LeaveServerModal />
      <DeleteServerModal />
      <CreateChannelModal />
      <MembersModal />
      <EditServerModal />
      <CreateServerModal />
      <InviteModal />
      <EditChannelModal />
      <DeleteChannelModal />
      <MessageFileModal />
      <DeleteMessageModal />
    </>
  );
};
