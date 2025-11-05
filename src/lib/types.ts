// Albums -----------------------------------------------------------------------------------------------

export type AlbumList = {
    Items: [
        {
            Name: string,
            ServerId: string,
            Id: string,
            Type: string,
            Artists: Array<string>,
            AlbumArtist: string,
            AlbumArtists: [
                {Name: string, Id: string}
            ]
        }
    ]
}

export type Album = {
    Name: string,
    ServerId: string,
    Id: string,
    Type: string,
    Artists: Array<string>,
    AlbumArtist: string,
    AlbumArtists: [
        {Name: string, Id: string}
    ]
}

// Artists -----------------------------------------------------------------------------------------------

export type ArtistList = {
    Items: [
        {
            Name: string,
            ServerId: string,
            Id: string,
        }
    ]
}

export type Artist = {
    Name: string,
    ServerId: string,
    Id: string,
}

// Tracks -----------------------------------------------------------------------------------------------

export type TrackList = {
    Items: [
        {
            Name: string,
            ServerId: string,
            Id: string,
            IndexNumber: number,
            AlbumArtist: string,
            AlbumArtists: Record<string, string>
        }
    ]
}

export type Track = {
    Name: string,
    ServerId: string,
    Id: string,
    IndexNumber: number,
    AlbumArtist: string,
    AlbumArtists: Record<string, string>
}