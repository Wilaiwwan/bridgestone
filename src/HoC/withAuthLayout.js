import AuthLayout from "../common/AuthLayout";

function withAuthLayout(WrapperComponent) {
    return (props) => (
        <AuthLayout>
            <WrapperComponent {...props} />  { /* props.children =  <WrapperComponent {...props} />  */}
        </AuthLayout>
    );
}

export default withAuthLayout;
