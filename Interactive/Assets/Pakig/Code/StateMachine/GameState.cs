using UnityEngine;

namespace Sapphus.State
{
    /// <summary>
    /// GameState is the logic behind a state, where a GameScreen is the data and viewmodel of a state
    /// </summary>
    public abstract class GameState : MonoBehaviour
    {
        protected StateMachine _sm;
        abstract public string GetState();

        public virtual void OnInit(StateMachine sm)
        {
            _sm = sm;
        }
        public virtual void OnDelete() { }
        public virtual void OnEnter() { }
        public virtual void OnExit() { }
        public virtual void OnFocusEnter() { }
        public virtual void OnFocusExit() { }
        public virtual void StateUpdate() { }
    }

    public abstract class CanvasGameState : GameState
    {
        public override void OnEnter()
        {
            gameObject.SetActive(true);
            transform.SetAsFirstSibling();
        }

        public override void OnFocusEnter()
        {
            // gameObject.SetActive(true);
            transform.SetAsFirstSibling();
            activateListeners();
        }

        public override void OnFocusExit()
        {
            // gameObject.SetActive(false);
            deactivateListeners();
        }

        public override void OnExit()
        {
            gameObject.SetActive(false);
        }

        protected virtual void activateListeners() { }
        protected virtual void deactivateListeners() { }
    }
}
