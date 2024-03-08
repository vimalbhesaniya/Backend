const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
    personalAddress: {
        type: String,
        required: false
    },
    pinCode: {
        type: String,
        required: false
    },
    state: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
});

const EducationSchema = new mongoose.Schema({
    univercity: {
        type: String
    },
    school: {
        type: String
    },
    institutionName: {
        type: String,
        required: false
    },
    degreeLevel: {
        type: String,
        required: false
    },
    startDateSchool: {
        type: Date,
        required: false
    },
    endDateSchool: {
        type: Date,
        required: false
    },
    gpa: {
        type: Number,
        required: false
    },
    certifications: [{
        type: String,
        required: false
    }],
    onlineCourses: [{
        type: String,
        required: false
    }],
});

const WorkExperienceSchema = new mongoose.Schema({
    userType: {
        type: String,
        required: false
    },
    jobTitle: {
        type: String,
    },
    companyName: {
        type: String,
    },
    startDateWork: {
        type: Date
    },
    endDateWork: {
        type: Date
    },
    responsibilities: {
        type: String
    },
    achievements: [{ type: String, required: false }],
});

const UserSchema = new mongoose.Schema({
    privat : {
        type :Boolean
    },
    email: {
        type: String,
    },
    password: {
        type: String
    },
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    profileImage: {
        type: String,
    },
    registrationDate: {
        type: Date,
        default: Date.now,
    },
    langauges: {
        type: [String],
    },
    cv: {
        type: String
    },
    skills: {
        type: [String],
    },
    profession: {
        type: String,
    },
    secretKey: {
        type: String
    },
    location: [AddressSchema],
    education: [EducationSchema],
    experience: [WorkExperienceSchema]
});

const CompanySchema = new mongoose.Schema({
    Name: { type: String, required: false },
    Address: [AddressSchema],
    Industry: { type: String },
    Email_ID: { type: String, required: false },
    Logo: { type: String, required: false },
    TagLine: { type: String, required: false },
    Websites: { type: [String] },
    Contact: { type: String, required: false },
    Years: { type: String, required: false },
    Project: { type: [String], require: false },
    Description: { type: String, required: false },
    secretKey: { type: String, required: false },
    OwnerDetail: {
        Name: { type: String, required: false },
        EmailID: { type: String, required: false },
        Contact: { type: String, required: false }
    },
    HRDetail: {
        Name: { type: String, required: false },
        EmailID: { type: String, required: false },
        Contact: { type: String, required: false }
    }
});

const JobSchema = new mongoose.Schema({
    Title: { type: String, required: false },
    Position: { type: String, required: false },
    JobPostedTime: { type: String, default: Date.now, required: false },
    Description: {
        JobDescription: { type: String, required: false },
        TechnicalDescription: { type: String, required: false }
    },
    Experience: { type: String, required: false },
    JobType: { type: String, required: false },
    Salary: { type: String, required: false },
    company: { type: mongoose.Schema.Types.ObjectId, ref: "companies", autopopulate: true }
});

const SavedJobSchema = new mongoose.Schema({
    // User_ID:{ type: String, required:true},
    // Job_ID:{ type: String, required:true},
    Status: { type: String, enum: [true, false], default: true },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "jobs", autopopulate: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", autopopulate: true }
})

const ConnectionSchema = new mongoose.Schema({
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: "companies", autopopulate: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", autopopulate: true },
    status:{type:String, enum:["Accepted","Rejected","Pending","Done"]}
})

const JobApplicationsSchema = new mongoose.Schema({
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: "companies", autopopulate: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", autopopulate: true },
    jobid: { type: mongoose.Schema.Types.ObjectId, ref: "jobs", autopopulate: true }
})

UserSchema.plugin(require("mongoose-autopopulate"))
CompanySchema.plugin(require("mongoose-autopopulate"))
EducationSchema.plugin(require("mongoose-autopopulate"))
WorkExperienceSchema.plugin(require("mongoose-autopopulate"))
JobSchema.plugin(require("mongoose-autopopulate"))
SavedJobSchema.plugin(require("mongoose-autopopulate"))
ConnectionSchema.plugin(require("mongoose-autopopulate"))
JobApplicationsSchema.plugin(require("mongoose-autopopulate"))

const User = mongoose.model("users", UserSchema);
const Company = mongoose.model("companies", CompanySchema);
const JobPost = mongoose.model("jobs", JobSchema);
const SavedJob = mongoose.model("savedjobs", SavedJobSchema);
const Connection = mongoose.model("connections", ConnectionSchema);
const JobApplications = mongoose.model("jobapplications", JobApplicationsSchema)

module.exports = { User, Company, JobPost, SavedJob, Connection, JobApplications };