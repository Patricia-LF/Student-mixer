export function NotPresentList({ children}) {
    return (
        <div className="notPresentList" style={{backgroundColor: "hotpink"}}>
            <h1>Not present</h1>
            <div className="not-present">
                { children }
            </div>
        </div>
    )
}