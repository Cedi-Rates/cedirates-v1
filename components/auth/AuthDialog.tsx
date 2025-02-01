import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DialogLogin from "@/app/(auth)/dialog-login/page";
import DialogSignup from "@/app/(auth)/dialog-signup/page";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AuthDialog: React.FC<AuthDialogProps> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] pt-12">
        <Tabs defaultValue="account">
          <TabsList className="grid w-full grid-cols-2 mb-5 bg-[#ffffff] border border-[#eeeeee] rounded-lg !h-[42.5px]">
            <TabsTrigger
              value="account"
              className="rounded-lg data-[state=active]:!bg-[#EFF6FF] data-[state=active]:!text-[#1896FE] hover:!text-[#1896FE] data-[state=active]:!shadow-none"
            >
              Login
            </TabsTrigger>
            <TabsTrigger
              value="password"
              className="rounded-lg data-[state=active]:!bg-[#EFF6FF] data-[state=active]:!text-[#1896FE] hover:!text-[#1896FE] data-[state=active]:!shadow-none"
            >
              Sign up
            </TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-center">
                  Sign into your CediRates account to continue ✨
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <DialogLogin />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-center">
                  Create an Account
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <DialogSignup />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
