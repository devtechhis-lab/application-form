// Fill the Parents Information section: father, mother, and guardian details.
export const fillParentsInfo = (data, { drawInField }) => {
  const {
    type,
    degree,
    fatherFirstName,
    fatherOccupation,
    fatherPhoneNumber,
    fatherEmail,
    motherFirstName,
    motherLastName,
    motherOccupation,
    guardianFullName,
    guardianRelationship,
    guardianEmail,
    guardianPhoneNumber,
    guardianAddress,
  } = data;

  drawInField("fatherName", fatherFirstName);
  drawInField("fatherOccupation", fatherOccupation);
  drawInField("motherFullName", motherFirstName + " " + motherLastName);
  drawInField("motherOccupation", motherOccupation);
  drawInField("fatherEmail", fatherEmail);
  drawInField("fatherPhone", fatherPhoneNumber);
  drawInField("guardianFullName", guardianFullName);
  drawInField("guardianPhone", guardianPhoneNumber);
  drawInField("guardianEmail", guardianEmail);
  drawInField("guardianRelationship", guardianRelationship);
  drawInField("guardianAddress", guardianAddress);
};
