"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ScheduledMeetingList from "./_components/ScheduledMeetingList";
import {
  collection,
  getDocs,
  getDoc,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { app } from "@/config/FirebaseConfig";
import { format, getDate } from "date-fns";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

function ScheduledMeeting() {
  const db = getFirestore(app);
  const { user } = useKindeBrowserClient();

  const [meetingList, setMeetingList] = useState([]);
  useEffect(() => {
    user && getScheduledMeetings();
  }, [user]);

  const getScheduledMeetings = async () => {
    setMeetingList([]);
    const q = query(
      collection(db, "ScheduledMeetings"),
      where("businessEmail", "==", user.email)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      setMeetingList((prev) => [...prev, doc.data()]);
    });
  };

  const filterMeetingList = (type) => {
    if (type == "upcoming") {
      return meetingList.filter(
        (item) => item.formattedTimeStamp >= format(new Date(), "t")
      );
    } else {
      return meetingList.filter(
        (item) => item.formattedTimeStamp < format(new Date(), "t")
      );
    }
  };
  return (
    <div className="p-10">
      <h2 className="font-bold text-2xl">Scheduled Meetings</h2>
      <hr className="my-5" />
      <Tabs defaultValue="upcoming" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          <ScheduledMeetingList meetingList={filterMeetingList("upcoming")} />
        </TabsContent>
        <TabsContent value="expired"></TabsContent>
      </Tabs>
    </div>
  );
}

export default ScheduledMeeting;
