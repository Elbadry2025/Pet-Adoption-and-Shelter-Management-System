import axios from "axios";

const Backup = () => {
    const backup = async () => {
        try {
        const response = await axios(
            `http://localhost:8081/api/auth/backup`,
            {
                method: 'POST'
            }
        )
            alert("Success.")
        } catch (err: any) {
            alert("Couldn't backup.")
        }
    }

    const restore = async () => {
        try {
        const response = await axios(
            `http://localhost:8081/api/auth/restore`,
            {
                method: 'POST'
            }
        )
            alert("Success.")
        } catch (err: any) {
            alert("Couldn't restore.")
        }
    }
    
    return (
        <>
            <button className="btn btn-secondary btn-lg btn-block" onClick={backup} style={{ margin: '200px', position: 'relative', left: '300px' }}>Backup</button>
            <button className="btn btn-primary btn-lg btn-block" onClick={restore} style={{ position: 'relative', left: '400px' }}>Restore</button>
        </>
    )
}

export default Backup;
