using UnityEngine;
using UnityEngine.SceneManagement;

namespace Sapphus.State
{
    // Not actually a state!
    // This scene needs to be on index 0
    // And the main menu on index 1
    class StartupScreen : MonoBehaviour
    {
#pragma warning disable 649
        private AsyncOperation _load;
        [SerializeField] private float _minTime = 0.5f;
        private float _elapsedSec = 0.0f;
        [SerializeField] private GameObject _appManager;
#pragma warning restore

        private void Start()
        {
            // give the system some time to start displaying things
            Invoke("StartLoad", 0.1f);
        }

        private void StartLoad()
        {
            // Need to assign this in editor
            Instantiate(_appManager);
            AppManager.Instance.Init();

            // Start loading the main menu
            _load = SceneManager.LoadSceneAsync(1, LoadSceneMode.Single);
            _load.allowSceneActivation = false;
        }

        private void Update()
        {
            if (_load != null)
            {
                if (!_load.isDone && _load.progress >= 0.9f && _elapsedSec > _minTime)
                    FinishLoad();
                _elapsedSec += Time.deltaTime;
            }
        }

        private void FinishLoad()
        {
            _load.allowSceneActivation = true;
            StateMachine.Instance.PushState("Main Menu");
            _load = null;
        }
    }
}
