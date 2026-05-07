import mongoose from 'mongoose';
import express from 'express';
import connectDB from'./config/conectDB';
import dotenv from "dotenv";    
dotenv.config();
const app = express();

connectDB();