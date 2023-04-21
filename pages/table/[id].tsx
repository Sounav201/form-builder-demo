export default function ResponseTable() {
    const handleTable = async(Formid:any) => {
        try {
          
          const response = await fetch('/api/table' ,{
            method:"POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({Formid}),
    
          })
          const data = await response.json();
          console.log('Data from API : ', data);
        }
        catch (error) {
            console.log('Error : ', error);}

    }
    return(
        <button onClick={handleTable}>Click to show responses</button>
    )

}