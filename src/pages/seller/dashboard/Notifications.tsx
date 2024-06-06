import { useEffect, useState } from 'react'
import Header from '../../../components/reuseable/Header'
import { Button } from '../../../components/reuseable/Button';
import TextField from '../../../components/reuseable/TextField1';
import back from "../../../assets/Icons/back.svg"
import RejectModal from '../../../components/sellers/RejectModal';
import { data } from '../../../util/data';
import { useNotifications, useUser } from '../../../hooks/queries';
import LoadingOverlay from '../../../components/reuseable/LoadingOverlay';
import Pagination from '../../../components/reuseable/Pagination';
import { Circle } from 'lucide-react';
import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from 'react-hook-form';
import { privateApi } from '../../../api/axios';
import { InvalidateQueryFilters, useQueryClient } from '@tanstack/react-query';

const Notifications = () => {
  const queryClient = useQueryClient()
  const [isVerify, setIsVerify] = useState(false);
  const [notification, setNotification] = useState<any>({});
  const [id, setId] = useState("");
  const [transactionId, setTransactionId] = useState('')
  const [transactionInfo, setTransactionInfo] = useState<any>({})
  const [notificationIsLoading, setNotificationIsLoading] = useState(false)
  const [transactionIsLoading, setTransactionIsLoading] = useState(false)
  const [isClicked, setIsClicked] = useState(false);
  const [value, setValue] = useState("");
  const [isReject, setIsReject] = useState(false)
  const [page, setPage] = useState<number>(1);
  const {data: user, isLoading: userIsPending} = useUser()
  const { data: notifications, isLoading: notificationsIsPending } =
    useNotifications({
      page,
      size: 10,
    });
  const {control} = useForm()
  const handlePageChange = (selected: any) => {
    setPage(selected);
  };

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  const getNotification = async () => {
    try {
      setNotificationIsLoading(true)
      const response = await privateApi.get(`/notifications/${id}`);
      setNotification(response.data.data);
      setNotificationIsLoading(false)
    } catch (error: any) {
      setNotificationIsLoading(false)
      let resMessage;
      // toast.error(resMessage,{toastId: "error1"});
    }
  };

  const getTransactionInfo = async () => {
    try {
      setTransactionIsLoading(true)
      const response = await privateApi.get(`/transaction/link/${transactionId}`);
      setTransactionInfo(response.data.data);
      setTransactionIsLoading(false)
    } catch (error: any) {
      setTransactionIsLoading(false)
      let resMessage;
      // toast.error(resMessage,{toastId: "error1"});
    }
  };

  useEffect(() => {
    getNotification();
    getTransactionInfo()
  }, [id]);

  return (
    <div>
      {notificationsIsPending && <LoadingOverlay/> }
      <Header
        Heading='Notifications'
        Text='Get instant notification as you perform real-time transaction immediately on MyBalance.'
      />
      <p className='text-[#121212] text-lg font-bold'>You have  {user?.unreadNotificationCount} unread notifications</p>
      <div className="mt-6">
        {notifications?.data?.map((notification: any, key: any) => {
          const dateTime = new Date(notification.createdAt);
          const dateFormatted = dateTime.toISOString().split("T")[0];
          const timeFormatted = dateTime.toTimeString().split(" ")[0];
          return (
            <div key={notification?.id}>
              <div
                className="flex gap-x-2 w-[325px] mt-4 pl-6 pb-4 rounded border-b border-[#E4E4E4] cursor-pointer"
                onClick={() => {
                  const urlParts = notification?.actionUrl.split('/')
                  setTransactionId(urlParts[urlParts.length - 1])
                  console.log(urlParts[urlParts.length - 1])
                  setId(notification?.id);
                  setIsVerify(true);
                  console.log(`notification id: ${id}`)
                  console.log(`transactionId: ${transactionId}`)
                }}
              >
                <Circle
                  fill={`${notification?.isSeen ? "#E4E4E4" : "#FD7E14"}`}
                  color={`${notification?.isSeen ? "#E4E4E4" : "#FD7E14"}`}
                  size={10}
                  className="mt-2"
                />
                <div>
                  <p className="text-[#121212] text-lg font-medium mb-2">
                    {notification?.title}
                  </p>
                  <p className="text-[#303030] text-sm font-normal">
                    {notification?.content.slice(0, 30)}...
                  </p>
                  <p className="text-[10px] text-[#B7B7B7] font-normal">
                    {dateFormatted} {timeFormatted}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
        {!notificationsIsPending && notifications?.data.length > 0 && (
          <div className="w-[325px] mt-[50px]">
            <Pagination
              initialPage={notifications?.meta?.currentPage}
              onPageChange={handlePageChange}
              pageCount={notifications?.meta?.totalPages}
            />
          </div>
        )}
      </div>
      {/* Side Opener */}
      <Dialog.Root open={isVerify}>
        <Dialog.Portal className="">
          <Dialog.Overlay
            onClick={() => {
              queryClient.invalidateQueries(["notifications"] as InvalidateQueryFilters);
              setIsVerify(false)
            }}
            className="bg-[#3a3a3a]/50 z-50 fixed inset-0"
          />
          <Dialog.Content>
            <div className="w-full max-w-[400px] h-screen z-50 fixed top-0 right-0 animate-fade-left animate-duration-300 animate-ease-out bg-white px-3 md:px-[16px] overflow-y-scroll">
              <div className="flex gap-4 items-center mt-10 mb-4">
                <img src={back} alt="back" onClick={() => {
                   queryClient.invalidateQueries(["notifications"] as InvalidateQueryFilters);
                  setIsVerify(false)
                }} />
                <h6 className="text-[23px] font-medium">
                  {notification?.title}
                </h6>
              </div>
              {notification.category === "FUNDS_LOCKED_SELLER" ? (
                <div>
                  {transactionIsLoading && <LoadingOverlay/> }
                  <h1 className="text-[#393737] text-lg font-medium">
                    BUYER INFORMATION
                  </h1>
                  <div className="mt-6 flex flex-col gap-4 mb-4">
                    <TextField
                      name='buyerName'
                      label="Buyer's name"
                      placeholder="Aremu Jamiu"
                      readOnly={true}
                      value={transactionInfo?.escrowMetadata?.parties?.buyer?.name}
                      control={control}
                    />
                    <TextField
                      control={control}
                      rules={{ required: false }}
                      name={"type"}
                      label="Type of item(s)"
                      placeholder="i phone"
                      value={transactionInfo?.escrowMetadata?.itemType}
                      readOnly
                    />
                    <TextField
                      control={control}
                      rules={{ required: false }}
                      name={"number"}
                      label="Number of item(s)"
                      placeholder="give a description"
                      type="number"
                      value={transactionInfo?.escrowMetadata?.itemQuantity}
                      readOnly
                    />
                    <TextField
                      name='buyerEmail'
                      label="Buyer's email"
                      placeholder="jaremu@oinvent.com"
                      readOnly={true}
                      value={transactionInfo?.escrowMetadata?.parties?.buyer?.email}
                      control={control}
                    />
                  </div>
                  <h1 className="text-[#393737] text-lg font-medium">
                    ITEM(S) INFORMATION
                  </h1>
                  <div className="mt-6 flex flex-col gap-4">
                    <TextField
                      name='amount'
                      label="Amount locked"
                      placeholder="5"
                      type="number"
                      readOnly={true}
                      value={transactionInfo?.amount}
                      control={control}
                    />
                    <TextField
                      name='purpose'
                      label="Reason for locking (description)"
                      placeholder="Purchase of sneakers"
                      readOnly={true}
                      value={transactionInfo?.escrowMetadata?.purpose}
                      control={control}
                    />
                    <TextField
                      name={"itemQuantity"}
                      label="Delivery Date"
                      readOnly={true}
                      value={transactionInfo?.escrowMetadata?.deliveryDate}
                      control={control}
                    />
                  </div>
                  <h1 className="mt-6 text-[#303030] text-lg font-medium">
                    VENDOR ACCOUNT INFORMATION
                  </h1>
                  <div className="mt-6 flex flex-col gap-4 mb-8">
                    <TextField
                      label="Bank Name"
                      placeholder="1234567890"
                      name='bank'
                      readOnly={true}
                      value={transactionInfo?.escrowMetadata?.meta?.bankName}
                      control={control}
                    />
                    <TextField
                      label="Account number"
                      placeholder="1234567890"
                      name={"accountNumber"}
                      readOnly={true}
                      value={transactionInfo?.escrowMetadata?.meta?.accountNumber}
                      control={control}
                    />
                    <div className="relative">
                      <TextField
                        name={"accountName"}
                        label="Account Name"
                        placeholder="JMusty Feet"
                        readOnly={true}
                        value={transactionInfo?.escrowMetadata?.meta?.accountName}
                        control={control}
                      />
                    </div>
                    <TextField
                      name={"partnerEmail"}
                      label="Email Address"
                      placeholder="JMustyfeet@gmail.com"
                      value={transactionInfo?.lockedAmount?.sellerEmail}
                      control={control}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  {notificationIsLoading && <LoadingOverlay/> }
                  <p>{notification?.content}</p>
                </div>
              )}
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}

export default Notifications