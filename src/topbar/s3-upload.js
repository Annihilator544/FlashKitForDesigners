
import React, { useState, useEffect } from 'react';
import { S3Client, ListObjectsV2Command, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Loader2, LucideUpload } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { useProject } from 'plotNoFeatures/project';
import { cn } from '../lib/utils.ts';

const s3Client = new S3Client({
  region: 'eu-west-2', // e.g., 'us-east-1'
  credentials: {
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  }
});

const ShareButton = observer(({ store }) => {
  const [uploading, setUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const bucketName = 'flashkitmarketplace';
  const project = useProject();

  const handleFileUpload = async (event) => {
    const file = store.toJSON();
    const fileName = `${window.project.name.trim()}.json`;
    //save image as well
    const image = await store.toDataURL({ mimeType: 'image/jpeg' });
    const Shareable = JSON.stringify({json: file, preview: image});

    setUploading(true);
    try {
      const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: fileName,
        Body: Shareable,
        ContentType: 'application/json',
      });
      console.log('Uploading file:', command);
        if (window.project.name&&window.project.name==='') {
            console.log('Please select a file to upload');
            return;
        }
        else{
            await s3Client.send(command);
        }
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setUploading(false);
      setIsUploaded(true);
    }
  };

  return (
    <Dialog>
        <DialogTrigger>
            <Button className="my-auto">
            <LucideUpload className="h-4 mr-2" />
            Share
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Share Your Design !!!</DialogTitle>
            <DialogDescription>
                Share your design with the world by uploading it to our servers. 
                <br />
                <p className="mt-5 text-black font-bold">Design Name</p>
                {window.project.name ? (
                    <Input
                    className="mt-2"
                    value={window.project.name}
                    onChange={(e) => {
                        window.project.name = e.target.value;
                        window.project.requestSave();
                    }}
                    label="File Name"
                    />
                ) : (
                    <Input
                    className="mt-2"
                    value={window.project.name}
                    onChange={(e) => {
                        window.project.name = e.target.value;
                        window.project.requestSave();
                    }}
                    label="File Name"
                    />
                )}
            </DialogDescription>
            </DialogHeader>
            <DialogFooter>
            {uploading ? 
                <Button className="mt-5" disabled>
                  <Loader2 className="animate-spin h-4 mr-2" />
                    Uploading
                </Button>
                :
                window.project.name&&window.project.name!=='' ?
                <Button className="mt-5" onClick={()=>handleFileUpload()}>
                    {isUploaded ? <></>: <LucideUpload className="h-4 mr-2" />}
                    {isUploaded ? "Uploaded": "Share to Marketplace"}
                </Button>
                :
                <Button className="mt-5" disabled >
                    {isUploaded ? <></>: <LucideUpload className="h-4 mr-2" />}
                    {isUploaded ? "Uploaded": "Share to Marketplace"}
                </Button>
            }
            </DialogFooter>
        </DialogContent>
    </Dialog>
  );
});

export default ShareButton;