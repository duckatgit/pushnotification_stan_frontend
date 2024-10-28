'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import axios from 'axios'
import { useEffect, useState } from "react";
import { toast } from "sonner"


export default function Home() {
  const [tokens, setTokens] = useState([])

  const listDeviceTokenFunc = async () => {
    const listDeviceTokenAPI = await axios.get(`http://localhost:3002/notifications/tokens`);

    if (listDeviceTokenAPI.status == 200) {
      setTokens(listDeviceTokenAPI?.data)
    }
  }

  const sendNotificationFunc = async (token: string) => {
    const sendNotificationAPI = await axios.post(`http://localhost:3002/notifications/send`, {
      token
    });

    if (sendNotificationAPI?.status == 201) {
      toast("Notification has been sent")
    }
  }

  useEffect(() => {
    listDeviceTokenFunc()
  }, [])

  console.log('tokens', tokens)

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tokens?.map((item, index) => {
            return (
              <TableRow key={index}>
                <TableCell className="font-medium">{item}</TableCell>
                <TableCell className="text-right">
                  <button
                    className="bg-green-500 p-3 rounded-md font-semibold"
                    onClick={() => {
                      sendNotificationFunc(item)
                    }}>Send Notification</button>
                </TableCell>
              </TableRow>
            )
          })}

        </TableBody>
      </Table>
    </div>
  );
}
