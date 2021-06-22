pipeline {
  agent {
    label 'windows'
  }

  stages {
    stage('DEV') {
       agent {
        label 'windows'
            }
      steps {
       bat "\"${tool 'MSBuild'}\" SolutionName.sln /p:Configuration=Release /p:Platform=\"Any CPU\" /p:ProductVersion=1.0.0.${env.BUILD_NUMBER}"

         echo 'coucou'
      }
    }

    stage('TST1') {
      steps {
        echo 'coucou'
      }
    }

    stage('PROD') {
      steps {
        echo 'coucou'
      }
    }

    stage('ACC') {
      steps {
        echo 'coucou'
      }
    }

  }
  environment {
    env = 'DEV'
  }
}
