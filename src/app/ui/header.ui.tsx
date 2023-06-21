interface HeaderUIProps{
    login: boolean
}

export default function HeaderUI ({login}: HeaderUIProps){
    return (
        <div className="header">
            <p>{login ? 'Connected': 'Disconeted'}</p>
        </div>
    )
}