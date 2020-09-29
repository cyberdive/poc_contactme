pipeline {
  agent none
  stages {
    stage('DEV') {
      steps {
        build 'Build source'
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