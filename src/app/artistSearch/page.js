function Page({params}) {
    return(
        <>
        <h2>Searching for {params.artist} (route parameter version)</h2>
        <p>You are searching for the artist {params.artist}</p>
        </>
    );
}

export default Page;