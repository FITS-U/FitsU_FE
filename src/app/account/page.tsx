// import Link from "next/link";/
import SetUpAccountPage from "@/app/account/components/SetUpAccountPage"

interface Props {
  bankId: string;
  bankName: string;
}

const AccountPage : React.FC<Props> = ({ bankId, bankName })=> {
  return (
    <div>
        <SetUpAccountPage bankId={Number(bankId)} bankName={bankName}/>
    </div>
  )
}

export default AccountPage;