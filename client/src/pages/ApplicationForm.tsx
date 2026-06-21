import NewLicense from "./New_license";
import NewMaster from "./New_master";
import ReLicense from "./Re_license";
import ReMaster from "./Re_master";

const ApplicationForm = ({
  degree,
  type,
  setIsWelcome,
}: {
  degree: string;
  type: string;
  setIsWelcome: (isWelcome: boolean) => void;
}) => {
  return (
    <>
      {degree === "license" && type === "newRegistration" && (
        <NewLicense setIsWelcome={setIsWelcome} degree={degree} type={type} />
      )}
      {degree === "license" && type === "reRegistration" && (
        <ReLicense setIsWelcome={setIsWelcome} degree={degree} type={type} />
      )}
      {degree === "master" && type === "newRegistration" && (
        <NewMaster setIsWelcome={setIsWelcome} degree={degree} type={type} />
      )}
      {degree === "master" && type === "reRegistration" && (
        <ReMaster setIsWelcome={setIsWelcome} degree={degree} type={type} />
      )}
    </>
  );
};

export default ApplicationForm;
