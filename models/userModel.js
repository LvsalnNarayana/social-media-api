const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//_____  require mongoose  _____//
import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

//________  schema  ________//
const schema = mongoose.Schema;

const userSchema = new schema(
    {
        username: {
            type: String,
            required: [true, "username is required"],
            lowercase: true,
            trim: true,
            unique: true,
        },
        email: {
            type: String,
            required: [true, "email is required"],
            lowercase: true,
            trim: true,
            validate: {
                validator: (data) => {
                    return emailRegex.test(data);
                },
                message: "not a valid email",
            },
        },
        mobile: {
            type: String,
            unique: true,
            trim: true,
            validate: {
                validator: (data) => {
                    return data.toString().length === 10;
                },
            },
        },
        country: {
            type: String,
            trim: true,
        },
        gender: {
            type: String,
            required: [true, 'gender is required'],
            enums: ['MALE', 'FEMALE']
        },
        password: {
            type: String,
            required: [true, "password is required"],
            trim: true,
        },
        dob: {
            type: Date,
            required: [true, "DOB is required"],
        },
        img_url: {
            type: String,
            set: (data) => {
                return "https://api.multiavatar.com/Starcrasher.png?apikey=Tbxudl6goDCVB5}";
            },
        },
        events: [
            {
                event_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "events",
                },
                default: []
            },
        ],
        posts: [
            {
                post_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Post",
                },
                default: []
            },
        ],
        work_and_education: [
            {
                highschool: [
                    {
                        name: {
                            type: String
                        },
                        start_date: {
                            type: Date
                        },
                        end_date: {
                            type: Date
                        },
                        status: {
                            type: String,
                            enums: ['PUBLIC', 'FRIENDS', 'ONLYME']
                        },
                        date_added: {
                            type: Date
                        },
                        default: []
                    }
                ],
                university: [
                    {
                        name: {
                            type: String
                        },
                        start_date: {
                            type: Date
                        },
                        end_date: {
                            type: Date
                        },
                        status: {
                            type: String,
                            enums: ['PUBLIC', 'FRIENDS', 'ONLYME']
                        },
                        date_added: {
                            type: Date
                        },
                        default: []
                    }
                ],
                work: [
                    {
                        name: {
                            type: String
                        },
                        start_date: {
                            type: Date
                        },
                        end_date: {
                            type: Date
                        },
                        status: {
                            type: String,
                            enums: ['PUBLIC', 'FRIENDS', 'ONLYME']
                        },
                        date_added: {
                            type: Date
                        },
                        default: []
                    }
                ],
            },
        ],
        places: [
            {
                name: {
                    type: String
                },
                status: {
                    type: String,
                    enums: ['PUBLIC', 'FRIENDS', 'ONLYME']
                },
                date_added: {
                    type: Date
                },
                default: []
            }
        ],
        friends: [
            {
                friend_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                },
                friend_since: {
                    type: Date
                },
                default: []
            },
        ],
        saved_posts: [
            {
                post_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Post",
                },
                date_added: {
                    type: Date
                },
                default: []
            },
        ],
        notifications: [
            {
                notification_type: {
                    type: String,
                    enums: ['POST_LIKED', 'POST_COMMENTED']
                },
                user_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                },
                post_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Post",
                },
                date_added: {
                    type: Date
                },
                default: []
            }
        ],
        settings: {
            type: mongoose.Schema.Types.Map,
            default: {},
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
});

userSchema.statics.CHECK_USERNAME = (data) => {
    const username_availability = User.findOne({ username: data });
    return username_availability;
}
userSchema.statics.CREATE_USER = (data) => {
    const user = new User({
        username: data.username,
        email: data.email,
        password: data.password,
        mobile: data.mobile,
        country: data.country,
        gender: data.gender,
        dob: data.dob,
        img_url: data.img_url
    });
    user.save().then((data) => {
        console.log(data);
    }).catch((err) => {
        console.log('____ERR____');
        console.log(err.message);
    });
    return 'user created!';

}
userSchema.statics.GET_PROFILE = (userId) => {
    const user = User.aggregate([
        {
            $match: {
                _id: mongoose.Types.ObjectId(userId)
            }
        },
        {
            $addFields: {
                id: {
                    $toString: "$_id",
                },
            },
        },
        {
            $project: {
                _id: 0,
                __v: 0,
                password: 0,
                friends: 0,
                posts: 0,
                saved_posts: 0,
                events: 0
            },
        },
    ]).exec((data) => {
        console.log(data);
        return data;
    });
}
userSchema.statics.GET_PROFILE_BY_ID = () => { }
userSchema.statics.GET_PROFILE_BY_NAME = () => { }
userSchema.statics.SEARCH_USERS = () => { }
userSchema.statics.GET_WORK_AND_EXPERIENCE = () => { }
userSchema.statics.SET_WORK_AND_EXPERIENCE = () => { }
userSchema.statics.GET_PLACES = () => { }
userSchema.statics.SET_PLACES = () => { }
userSchema.statics.GET_USER_SETTINGS = () => { }
userSchema.statics.SET_USER_SETTINGS = () => { }
userSchema.statics.GET_FRIEND_REQUESTS = () => { }
userSchema.statics.SEND_REQUEST = () => { }
userSchema.statics.ACCEPT_REQUEST = () => { }
userSchema.statics.REJECT_REQUEST = () => { }
userSchema.statics.REJECT_REQUEST = () => { }
userSchema.statics.UNFRIEND = () => { }
userSchema.statics.FOLLOW = () => { }
userSchema.statics.UNFOLLOW = () => { }



const User = mongoose.model("User", userSchema);
export default User;
