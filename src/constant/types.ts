

 

 export interface userType {
    username: string;
    password: string;
    email: string;
    nagrita?: string;
    profilePic?:string;
    _id?: string;
    isAdmin?:boolean;  // can be either citizen,admin
}

export interface tokenType{
    refreshToken?:string;
    accessToken?:string;
}

 export interface collegeType {
    collegeName: string;
    date: string;
    picture: string[];
    course: string[];
    description: string[];
    address: string;
    contact: number;
    website: number;
}


 export interface noticeType {
    isAdmin: boolean;
    username: string;
    img?: string;
    desc: string;
    headline: string;

}


 export interface QNAType {
    question: string;
    yesCount: number;
    noCount: number;
}

export interface userQues{
    userId:string;
    vote:boolean;
    answer:string;
}