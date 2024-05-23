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
                        {entry.name}
                    </span>
                    <span className='directory-row-name phone'>
                        {entry.phone_number}
                    </span>
                    <span className='directory-row-name address'>
                        {entry.address}
                    </span>
                    <span className='directory-row-name email'>
                        {entry.email}
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