import QRCodeReact from 'qrcode.react';
const Qrcode=({url})=>{
    return(
        <QRCodeReact
        value={url}
        renderAs="svg"
        size={128}
        level="L"
        includeMargin={false}
        />
        
    );
};
export default Qrcode;