export const generateUUID = () => {
    //Generate a 5 character random string
    const randomString = Math.random().toString(36).substring(2, 7);
    const formID = 'FORM'+randomString+(Date.now().toString());
    return formID;
}