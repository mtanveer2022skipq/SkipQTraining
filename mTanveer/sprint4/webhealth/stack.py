from aws_cdk import (
    Stack,
    aws_lambda as lambda_,
    aws_events as events_,
    aws_events_targets as targets_,
    aws_iam as iam_,
    RemovalPolicy,
    Duration
)
from resources import constants as c_


class Sprint2LaibaStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)



        # web health monitor
        WebHLambda = self.create_lambda("webHealthLambda", "./resources", "lambda.lambda_handler")
        WebHLambda.apply_removal_policy(RemovalPolicy.DESTROY)

        lambda_schedule = events_.Schedule.rate(Duration.minutes(60))  # an event generated every minute
        lambda_target = targets_.LambdaFunction(WebHLambda)
        rule = events_.Rule(self, "WHL_Invocation_Rule",
                            description="Periodic Lambda",
                            enabled=True,
                            schedule=lambda_schedule,
                            targets=[lambda_target])



    def create_lambda(self, id_, asset, handler):
        return lambda_.Function(self, id_,
                                runtime=lambda_.Runtime.PYTHON_3_6,
                                handler=handler,
                                code=lambda_.Code.from_asset(asset),
                                timeout=Duration.seconds(60))