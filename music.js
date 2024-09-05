class Music {
    constructor(title, singer, img, file) {
        this.title = title;
        this.singer = singer;
        this.img = img;
        this.file = file;
    }

    getName() {
        return this.title + " - " + this.singer;
    }
}


const musicList = [
    new Music("Children's Story", "SlickRick","1","1.mp3"),    
    new Music("Rap God", "Eminem","2","2.mp3"),    
    new Music("Euphoria", "Kendrick Lamar","3","3.mp3")    
];
