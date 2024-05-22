import '../styles/Directory.css';

export default function DirectoryRow({index, entry=null}) {
    var odd = ''

    if(index%2 != 1) {
      odd = 'odd';  
    }

    if (entry) {
        return (
            <>
                <div className={"directory-row "+odd}>
                        <span className='directory-row-name name'>
                            {/* {entry.firstname + " " + entry.lastname} */}
                            {entry.Name}
                        </span>
                        <span className='directory-row-name status'>
                            {entry.Status}
                        </span>
                        <span className='directory-row-name phone'>
                            {entry.PhoneNumber}
                        </span>
                        <span className='directory-row-name address'>
                            {entry.Address}
                        </span>
                        <span className='directory-row-name email'>
                            {entry.Email}
                        </span>
                </div>
            </>
        )
    }
    else {
        return (
            <>
                <div className={"directory-row "+odd}>
                        <span className='directory-row-name'>
                        </span>
                </div>
            </>
        )
    }
}