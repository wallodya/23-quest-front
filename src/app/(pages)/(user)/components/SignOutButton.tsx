import { useSignOut } from "common/hooks"
import Button, { ButtonTypes } from "components/ui/Button"
import { toast } from "react-toastify"

export const SignOutButton = ({ type }: { type?: ButtonTypes }) => {
    const { handleSignOut } = useSignOut({
        onSuccess: () => {
            toast.info("Logged out successfully");
        },
        onError: () => {
            toast.error("Something went wrong during log out");
        },
    });
    return (
        <Button type={type ?? "filled"} buttonProps={{ onClick: handleSignOut }}>
            Sign out
        </Button>
    );
};