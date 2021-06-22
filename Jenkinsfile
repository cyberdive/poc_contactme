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
